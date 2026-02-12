import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MemorySchema } from "../Schema/MemorySchema";
import Input from "../Components/UI/Input";
import Select from "../Components/UI/Select";
import CustomImage from "../Components/UI/CustomImage";
import Button from "../Components/UI/Button";
import { handleUpload } from "../Utils/imageUpload";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const MemoryForm = ({ data, submitHandler, processing }) => {
    const [url, setUrl] = useState("")

    const {
        register,
        handleSubmit,
        setValue, reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(MemorySchema),
        defaultValues: data
    });

    useEffect(() => {
        if (data) {
            reset(data);
            setUrl(data.image)
        }
    }, [data, reset]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const response = await toast.promise(handleUpload(file), {
            loading: "Uploading...",
            success: "Uploaded successfully",
            error: "Failed to upload",
        });
        setUrl(response)
        setValue("image", response);
    };
    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="max-w-2xl mx-auto mt-8"
        >
            <Input
                label="Enter Your Title"
                type="text"
                placeholder="your happiest moment"
                name="title"
                register={register}
                error={errors.title?.message}
            />

            <CustomImage label="Please Select Your Image" handleImageChange={handleImageChange}
                setValue={setValue}
                error={errors.image?.message}
                url={url}
            />

            <div className="grid-cols-1 grid md:grid-cols-2 gap-4 w-full">
                <Input
                    label="Enter Your Date"
                    type="date"
                    name="date"
                    register={register}
                    error={errors.date?.message}
                />

                <Select
                    label="Enter Your Tag"
                    name="tag"
                    register={register}
                    error={errors.tag?.message}
                />
            </div>

            <Button
                type="submit"
                loading={processing}
                variant="primary"
                fullWidth={true}
                className="mt-4"
            >
                {processing ? "Processing..." : "Submit"}
            </Button>
        </form>
    );
};

export default MemoryForm;
