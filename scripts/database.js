const database = {
    governors: [
        {
            id: 1,
            name: "Schwartz",
            active: true,
            colonyId: 1
        },
        {
            id: 2,
            name: "Evil Morty",
            active: true,
            colonyId: 4
        },
        {
            id: 3,
            name: "Zapp Brannigan",
            active: true,
            colonyId: 3
        },
        {
            id: 4,
            name: "Starlord",
            active: true,
            colonyId: 3
        },
        {
            id: 5,
            name: "Skynet",
            active: true,
            colonyId: 2
        }
    ],
    colonies: [
        {
            id: 1,
            name: "Gotham City"
        },
        {
            id: 2,
            name: "Zion"
        },
        {
            id: 3,
            name: "Coruscant"
        },
        {
            id: 4,
            name: "The Citadel"
        },
    ],
    facilities : [
        {
            id: 1,
            name: "Full Moon Garrison",
            active: true
        },
        {
            id: 2,
            name: "Pheonix Tower",
            active: true
        },
        {
            id: 3,
            name: "Trailblazer Island",
            active: true
        },
    ],
    minerals: [
        {
            id: 1,
            name: "Unobtanium"
        },
        {
            id: 2,
            name: "Infinity Stones"
        },
        {
            id: 3,
            name: "Schmeckles"
        },
        {
            id: 4,
            name: "Hypnotons"
        },
        {
            id: 5,
            name: "Kalaxian Crystals"
        },
        {
            id: 6,
            name: "Blemflarck"
        },
    ],
    facilityMinerals : [
        {
            id: 1,
            quantity: 25,
            facilityId: 1,
            mineralId: 1 
        },
        {
            id: 2,
            quantity: 19,
            facilityId: 1,
            mineralId: 2
        },
        {
            id: 3,
            quantity: 40,
            facilityId: 1,
            mineralId: 3
        },
        {
            id: 4,
            quantity: 11,
            facilityId: 2,
            mineralId: 2
        },
        {
            id: 5,
            quantity: 35,
            facilityId: 2,
            mineralId: 4
        },
        {
            id: 6,
            quantity: 62,
            facilityId: 3,
            mineralId: 2
        },
        {
            id: 7,
            quantity: 52,
            facilityId: 3,
            mineralId: 4
        },
        {
            id: 8,
            quantity: 23,
            facilityId: 3,
            mineralId: 5
        },
        {
            id: 9,
            quantity: 12,
            facilityId: 3,
            mineralId: 6
        },
    ],
    colonyMinerals: [
        {
            id: 1,
            colonyId: 2,
            mineralId: 4,
            quantity: 3
        },
        {
            id: 2,
            colonyId: 1,
            mineralId: 1,
            quantity: 11
        }
    ],
    transientState: {
        
    }
}

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const setGovernor = (governorId) => {
    database.transientState.selectedGovernor = governorId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const setMineral = (mineralId) => {
    database.transientState.selectedMineral = mineralId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const getGovernors = () => {
    return database.governors.map(governor => ({...governor}))
}

export const getColonies = () => {
    return database.colonies.map(colony => ({...colony}))
}

export const getFacilities = () => {
    return database.facilities.map(facility => ({...facility}))
}

export const getMinerals = () => {
    return database.minerals.map(mineral => ({...mineral}))
}

export const getFacilityMinerals = () => {
    return database.facilityMinerals.map(facilityMineral => ({...facilityMineral}))
}

export const getColonyMinerals = () => {
    return database.colonyMinerals.map(colonyMineral => ({...colonyMineral}))
}

export const getTransientState = () => {
    return {...database.transientState}
}

export const purchaseMineral = () => {
    // Copy the current state of user choices
    const newOrder = {...database.transientState}
    // Add a new primary key to the object
    const lastIndex = database.colonyMinerals.length - 1
    //Account for when the array may have a length of zero
    if (lastIndex === -1){
        newOrder.id = 1
    } else {
        newOrder.id = database.colonyMinerals[lastIndex].id + 1
    }
    // Add the new order object to colony Minerals state
    database.colonyMinerals.push(newOrder)
    // Reset the temporary state for user choices
    database.transientState = {}
    // Broadcast custom event to entire document so that the
    // application can re-render and update state
    document.dispatchEvent( new CustomEvent("stateChanged"))
}
