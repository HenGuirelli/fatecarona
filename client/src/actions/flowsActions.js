export function setFlows({ flows }) {
    return {
        type: 'SET_FLOWS',
        payload: { ...flows }
    }
}