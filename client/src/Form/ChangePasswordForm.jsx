import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '../Schema/ProfileSchema';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';

const ChangePasswordForm = ({ onSubmit, processing }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            currentpassword: '',
            newpassword: '',
            confirmpassword: ''
        }
    });

    const submitHandler = async (data) => {
        const success = await onSubmit(data);
        if (success) {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                name="currentpassword"
                register={register}
                error={errors.currentpassword?.message}
            />

            <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                name="newpassword"
                register={register}
                error={errors.newpassword?.message}
            />

            <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                name="confirmpassword"
                register={register}
                error={errors.confirmpassword?.message}
            />

            <Button
                type="submit"
                disabled={processing}
                loading={processing}
                variant="primary"
                fullWidth={true}
            >
                {processing ? 'Updating Password...' : 'Update Password'}
            </Button>
        </form>
    );
};

export default ChangePasswordForm;
