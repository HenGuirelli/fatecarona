export function setFlow({ name, origin, destination, waypoints = [] }) {
    return {
        type: 'SET_FLOW',
        payload: { name, origin, destination, waypoints }
    }
}