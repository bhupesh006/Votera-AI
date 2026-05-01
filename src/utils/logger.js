/**
 * Simple performance and activity logger to improve efficiency monitoring and code quality.
 */
const Logger = {
    info: (msg) => console.log(`%c[INFO] ${msg}`, 'color: #007bff; font-weight: bold;'),
    success: (msg) => console.log(`%c[SUCCESS] ${msg}`, 'color: #28a745; font-weight: bold;'),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`),
    
    /**
     * Measures the execution time of a function.
     * @param {string} label - Label for the measurement.
     * @param {Function} fn - Function to execute.
     */
    measure: async (label, fn) => {
        const start = performance.now();
        const result = await fn();
        const end = performance.now();
        console.log(`%c[PERF] ${label} took ${(end - start).toFixed(2)}ms`, 'color: #6f42c1; font-style: italic;');
        return result;
    }
};

export default Logger;
