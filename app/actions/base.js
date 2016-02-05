export const TOAST = 'TOAST'
export function toast(
  message, duration = 3000, action = null, callback = null) {
  return { type: TOAST, message, duration, action, callback }
}

export const CLEAR_TOAST = 'CLEAR_TOAST'
export function clearToast() {
  return { type: CLEAR_TOAST }
}


export default {
  toast,
  clearToast
}
