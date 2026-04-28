
enum Category {
    Pets = "Pets",
    Electronics = "Electronics",
    PersonalItems = "Personal_Items"
}
    
    
type ItemUpdateDTO = {
      id: number
      title: string
      status: string
      description: string
      publishdate: string
      expirationdate: string
      location: string
      category: Category
}
    
export type { ItemUpdateDTO, Category }