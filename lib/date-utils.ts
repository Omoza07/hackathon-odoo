/**
 * Format a date consistently across server and client
 * Uses DD/MM/YYYY format for Indian locale to avoid hydration mismatches
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const year = d.getUTCFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Format a number with Indian numbering system (lakhs, crores)
 * Ensures consistent rendering across server and client
 */
export function formatNumber(num: number): string {
  const parts = Math.round(num).toString().split('')
  const result = []
  let count = 0
  
  for (let i = parts.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      result.unshift(',')
    }
    result.unshift(parts[i])
    count++
  }
  
  return result.join('')
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return '₹' + formatNumber(amount)
}
