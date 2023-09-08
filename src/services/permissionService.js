import axiosInstance from "./axiosConfig";

const permissionService = {
    async createPermission(permission) {
        try {
            const response = await axiosInstance.post("/permissions", permission);
            return response.data ?? permission;
        } catch (error) {
            console.error("Permission Creation Request failure: ", error.message);
            throw error;
        }
    }
}

export default permissionService;
