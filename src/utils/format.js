export const formatValidationError = (error) => { // Function to format validation errors from Zod
  if(!error || !error.issues) return 'Validation Failed';  // No issues found

  if(Array.isArray(error.issues)) return error.issues.map(i => i.message).join(', ');  // Join all issue messages into a single string

  return JSON.stringify(error); // Fallback to JSON string representation
};