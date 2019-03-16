export function setFlow({ id, name, origin, destination, waypoints = [] }) {
    return {
        type: 'SET_FLOW',
        payload: { id, name, origin, destination, waypoints }
    }
}