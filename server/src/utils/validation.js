
export const validation = (schema, data) => {
    const result = schema.safeParse(data);
    const obj = {}
    if (!result.success) {
        const errors = result.error.issues.map(({ path, message }) => ({
            field: path.join("."),
            message
        }));

        obj.success = false;
        obj.errors = errors;

        return obj;
    }
    return {
        success: true,
        obj: result.data
    };
}