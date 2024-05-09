export interface ApiResponse {
    msg: string;
    success: boolean;
    status: string;
    user? : {
        _id: string;
        username: string;
        email: string;
        isVerified: boolean;
    }
}