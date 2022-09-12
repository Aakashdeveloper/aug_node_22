// Page1

# List of city
> http://localhost:9100/location
# List of restaurant
> http://localhost:9100/restaurants
# Restaurants wrt city
> http://localhost:9100/restaurants?stateId=3
# MealType
> http://localhost:9100/mealType

//Page2

# Restaurants wrt MealType
> http://localhost:9100/restaurants?mealId=1
# Filter on basis of cuisine
> http://localhost:9100/filters/1?cuisineId=5
# Filter on basis of cost
> http://localhost:9100/filters/1?lcost=450&hcost=980
# Sort on basis of Price
> http://localhost:9100/filters/1?cuisineId=2&sort=-1
# Pagination
> http://localhost:9100/filters/1?skip=0&limit=2

//Page3

# Details of Restaurants
> http://localhost:9100/details/1
# Menu wrt to restaurant

//Page4

# Details of selected menu
# Place order

//Page5

# Get all the orders
# Orders on basis of email
# Update Order status
# Delete Order