// Function to merge two cars
const mergeCars = (cars, personA, personB) => {
    const car1People = cars.find((car) => car.includes(personA))
    const car2People = cars.find((car) => car.includes(personB))

    const filteredOutCar1AndCar2 = cars.filter((car) => {
        return !car.includes(personA) || !car.includes(personB)
    })

    return [...filteredOutCar1AndCar2, [...car1People, ...car2People]]
}

const calculateDetour = (car1, car2, graph) => {
    const totalDetourDistance = graph[0][car1] + graph[car1][car2]

    return totalDetourDistance - graph[0][car2]
}

// Main function to solve the carpooling problem
export const solveCarpooling = (distanceMatrix, detourThreshold) => {
    const graph = []
    const cars = []

    // Builds a complete graph using the Google Maps Distance Matrix
    for (let i = 0; i < distanceMatrix.destination_addresses.length; i++) {
        graph[i] = []
        for (let j = 0; j < distanceMatrix.origin_addresses.length; j++) {
            graph[i][j] = distanceMatrix.rows[i].elements[j].duration.value
        }
    }

    // Step 2: Initial solution (each friend in a separate car)
    for (let i = 0; i < distanceMatrix.destination_addresses.length - 1; i++) {
        cars.push([i])
    }

    // Step 3: Merge cars with low detour
    for (let i = 1; i < cars.length - 1; i++) {
        for (let j = i + 1; j < cars.length - 1; j++) {
            const detour = calculateDetour(cars[i], cars[j], graph)
            console.log(`Car 1: ${i}, Car 2: ${j}, Detour distance: ${detour}`)
            if (detour <= detourThreshold) {
                cars = mergeCars(cars, i, j)
                break
            }
        }
    }

    return cars
}
