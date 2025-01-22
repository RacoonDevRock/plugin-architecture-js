export function createPluginContext(pluginName, globalContext) {
  if (pluginName === "auth-plugin") {
    return {
      ...globalContext,
      authService: {
        validateToken: (token) => {
          // Simulate token validation
          return token === "valid-token";
        },
      },
    };
  }

  return globalContext; // Return global context if no specific context is required
}
