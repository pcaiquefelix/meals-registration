import React, { useState } from "react";
import { UserPen, UserPlus, X } from "lucide-react";
import Button from "@/components/common/Button";
import InputForm from "@/components/form/InputForm";
import SelectForm from "@/components/form/SelectForm";
import Form from "@/components/form/Form";

const UserModal = ({ onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const formInfo = {
    title: user ? "Edit User" : "New User",
    icon: user ? (
      <UserPen className="w-10 h-10 text-blue-600 mr-2" />
    ) : (
      <UserPlus className="w-10 h-10 text-blue-600 mr-2" />
    ),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        {/* Modal */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-2 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <Form
            formTitle={formInfo.title}
            handleSubmit={handleSubmit}
            isSomeComponentRequired={true}
            formTitleIcon={formInfo.icon}
          >
            <InputForm
              type="text"
              labelText="Name"
              id="name"
              name="name"
              value={formData.name}
              handleOnChange={handleChange}
              required
            />

            <InputForm
              type="email"
              labelText="Email"
              id="email"
              name="email"
              value={formData.email}
              handleOnChange={handleChange}
              required
            />

            <SelectForm
              labelText="Role"
              id="role"
              name="role"
              value={formData.role}
              handleOnChange={handleChange}
              required
              list={[
                { value: "", label: "Select an option" },
                { value: "employee", label: "Employee" },
                { value: "admin", label: "Administrator" },
              ]}
            />

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                handleOnClick={onClose}
                buttonClassName="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                buttonText="Cancel"
              />
              <Button
                type="submit"
                buttonClassName="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                buttonText={user ? "Save Changes" : "Create User"}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserModal;
