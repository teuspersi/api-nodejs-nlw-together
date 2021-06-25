class CustomError extends Error {
    statusCode: number; 

    constructor(message?: string, statusCode?: number){
        super(message || "Unexpected error");
        this.name = "CustomError";
        this.statusCode = statusCode || 400;
    };
};

export { CustomError }