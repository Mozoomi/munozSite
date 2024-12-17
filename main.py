cityList = ["New York", "Los Angeles", "Detroit", "Texas"]

for i in range(len(cityList)):
    for j in range(0, len(cityList)-i-1):
        if len(cityList[j]) >= len(cityList[j+1]):
            cityList[j], cityList[j+1] = cityList[j+1], cityList[j]

print(cityList)