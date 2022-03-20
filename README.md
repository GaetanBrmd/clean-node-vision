# Shopping API with products, orders and bills.

## Products:

-   Can be created and listed
-   Have an identifier, a name, a price and a weight
-   Products can be sorted by name, price or weight

## Orders:

-   Can be created and listed
-   Have a status, a product list, a shipment amount, a total amount and a weight
-   Orders status can be one of pending, paid or canceled
-   Are offered 5% discount when the price exceeds 1000€
-   Shipment costs 25€ for every 50kg (50€ for 100kg, 75€ for 150kg, etc.)

## Bills

-   Can be listed
-   Have an amount and a creation date
-   Are automatically generated when an order status is set to paid

# TODO
