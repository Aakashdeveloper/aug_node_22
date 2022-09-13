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
>(GET) http://localhost:9100/menu/13

//Page4

# Details of selected menu
> (POST) http://localhost:9100/menuItem
[2,5,6]
# Place order
(POST) http://localhost:9100/placeOrder

{
	"orderId" : 3,
	"name" : "Nidhi",
	"email" : "nidhi@gmail.com",
	"address" : "Hom 42",
	"phone" : 7834645457,
	"cost" : 895,
	"menuItem" : [
		5,8,12
	]
}

//Page5
# Get all the orders
> http://localhost:9100/getOrder
# Orders on basis of email
> http://localhost:9100/getOrder?email=a@a.com
# Update Order status
> (Put) http://localhost:9100/updateOrder
{
	"_id":"63200311bb5b7fb603b367c5",
	"status":"Failed"
}
# Delete Order
>(delete)  http://localhost:9100/removeOrder
{
	"_id":"632002eebb5b7fb603b367c4"
}