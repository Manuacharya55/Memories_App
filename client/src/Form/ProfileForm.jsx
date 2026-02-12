import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../Schema/ProfileSchema";
import CustomImage from "../Components/UI/CustomImage";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";
import { handleUpload } from "../Utils/imageUpload";
import toast from "react-hot-toast";

const ProfileForm = ({ value, processing, updateProfile }) => {
    const [url, setUrl] = useState("");

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(ProfileSchema),
        defaultValues: value
    });

    useEffect(() => {
        if (value) {
            reset(value);
            if (value.image) setUrl(value.image);
        }
    }, [value, reset]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const response = await toast.promise(handleUpload(file), {
                loading: "Uploading...",
                success: "Image uploaded successfully",
                error: "Failed to upload image",
            });
            setUrl(response);
            setValue("image", response);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = (data) => {
        // Ensure image is included in submission data if url exists
        if (url) data.image = url;
        updateProfile(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label={"Enter Your Full Name"}
                type={"text"}
                placeholder={"John Doe"}
                name={"fullname"}
                register={register}
                error={errors?.fullname?.message}
            />

            <Input
                label={"Enter Your Email"}
                type={"email"}
                placeholder={"jhondoe@gmail.com"}
                name={"email"}
                register={register}
                error={errors?.email?.message}
            />

            <CustomImage
                label="Upload Profile Picture"
                handleImageChange={handleImageChange}
                url={url}
                error={errors?.image?.message}
            />

            <Button
                type="submit"
                loading={processing}
                variant="primary"
                fullWidth={true}
                className="mt-2"
            >
                {processing ? "Updating Profile..." : "Update Profile"}
            </Button>
        </form>
    );
};

export default ProfileForm;