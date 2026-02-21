"use client"

import { Plus, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"
import type { MenuItem } from "@/lib/data"
import { toast } from "sonner"

interface MenuItemCardProps {
  item: MenuItem
  restaurantId: string
  restaurantName: string
}

export function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const addItem = useCart((s) => s.addItem)
  const currentRestaurantId = useCart((s) => s.restaurantId)

  const handleAdd = () => {
    if (currentRestaurantId && currentRestaurantId !== restaurantId) {
      toast("Cart cleared", {
        description: `Your cart was updated to ${restaurantName}. We only support one restaurant per order.`,
      })
    }
    addItem(item, restaurantId, restaurantName)
    toast.success(`${item.name} added to cart`)
  }

  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/20 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          {item.popular && (
            <Badge variant="secondary" className="text-[10px] gap-1 bg-accent/10 text-accent border-0">
              <Flame className="w-3 h-3" />
              Popular
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-semibold text-foreground">${item.price.toFixed(2)}</span>
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex gap-1">
              {item.dietary.map((d) => (
                <Badge key={d} variant="outline" className="text-[10px] text-muted-foreground border-border">
                  {d}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="flex-shrink-0 h-9 w-9 rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={handleAdd}
        aria-label={`Add ${item.name} to cart`}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
