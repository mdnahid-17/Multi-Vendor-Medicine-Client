import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import classNames from "classnames";

const UpdateProfileModal = ({ isOpen, closeModal }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { fullName, photoUrl } = data;

    try {
      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully 🎉",
      });

      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
                <DialogTitle className="mb-4 text-2xl font-bold text-center">
                  Update Profile
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="font-semibold">Name</label>
                    <input
                      className={classNames(
                        "w-full border rounded-md p-3 mt-1 outline-none",
                        { "border-red-500": errors.fullName }
                      )}
                      defaultValue={user?.displayName || ""}
                      {...register("fullName", { required: true })}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">Name is required</p>
                    )}
                  </div>

                  {/* Photo URL */}
                  <div>
                    <label className="font-semibold">Photo URL</label>
                    <input
                      className={classNames(
                        "w-full border rounded-md p-3 mt-1 outline-none",
                        { "border-red-500": errors.photoUrl }
                      )}
                      defaultValue={user?.photoURL || ""}
                      {...register("photoUrl", { required: true })}
                    />
                    {errors.photoUrl && (
                      <p className="text-sm text-red-500">Photo URL is required</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateProfileModal;
