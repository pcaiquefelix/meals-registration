"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Search, User } from "lucide-react";
import UserModal from "@/components/users/UserModal";
import Button from "@/components/common/Button";
import ContentWrapper from "@/components/layout/ContentWrapper";
import InputForm from "@/components/form/InputForm";
import CustomLoader from "@/components/common/CustomLoader";
import { NextApiHandler } from "@/services/NextApiHandler";

const Content = ({ users, updateUsers }) => {
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersFilter, setUsersFilter] = useState(users);
  const notRegisteredInfo = "Not provided";
  const columnsClassName = {
    role: {
      Administrator: "bg-purple-100 text-purple-800",
      Employee: "bg-blue-100 text-blue-800",
      notRegistered: "bg-red-100 text-red-800",
      general: "bg-gray-200 text-gray-900",
    },
    status: {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
    },
  };

  useEffect(() => {
    setLoading(false);
  }, [users, usersFilter]);

  const handleSearchUser = (e) => {
    const searchFilterUpdate = users.filter((user) =>
      user?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setUsersFilter(searchFilterUpdate);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = async (userId) => {
    const confirmation = confirm("Do you want to delete the selected user?");

    if (confirmation) {
      try {
        const response = await NextApiHandler.delete(
          `/api/users/delete-users/${userId}`
        );
        if (response instanceof Error) {
          return alert(
            "The deletion encountered the following error: " + response.message
          );
        }
        users.splice(
          users.findIndex((user) => user.id === userId),
          1
        );
        setUsersFilter([...users]);

        alert("User successfully deleted!");
        handleCloseModal();
      } catch (error) {
        handleError(error);
      }
    }
  };

  const createUser = async (user) => {
    try {
      const response = await NextApiHandler.post(
        "/api/users/create-users",
        user
      );
      if (response instanceof Error) {
        return alert(
          "The creation encountered the following error: " + response.message
        );
      }
      const usersUpdateResponse = await updateUsers();
      if (usersUpdateResponse instanceof Error) {
        return alert(
          "The creation encountered the following error: " + response.message
        );
      }
      const usersUpdate = usersUpdateResponse.find(
        (listUser) => listUser?.email.toLowerCase() === user?.email.toLowerCase()
      );
      usersUpdate.status = "Active";
      users.push(usersUpdate);

      setLoading(true);
      setUsersFilter([...users]);

      alert("User successfully created!");
      handleCloseModal();
    } catch (error) {
      handleError(error);
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await NextApiHandler.put(
        `/api/users/update-users/${user.id}`,
        user
      );
      if (response instanceof Error) {
        return alert(
          "The update encountered the following error: " + response.message
        );
      }
      const usersUpdate = users.map((userItem) => {
        if (userItem.id === user.id) {
          return Object.assign(userItem, user);
        }
        return userItem;
      });
      setUsersFilter(usersUpdate);

      alert("User successfully updated!");
      handleCloseModal();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error instanceof Error) {
      console.error("Captured error:");
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    } else {
      console.error("Unknown error:", error);
    }
    alert("An unexpected error occurred. Please try again.");
  };

  const handleSaveUser = (user) => {
    if (user.id) {
      updateUser(user);
    } else {
      createUser(user);
    }
  };

  return (
    <>
      {loading ? (
        <ContentWrapper
          title="System Users"
          titleIcon={<User className="w-10 h-10 text-blue-600 mr-2" />}
        >
          <CustomLoader />
        </ContentWrapper>
      ) : (
        <ContentWrapper
          title="System Users"
          titleIcon={<User className="w-10 h-10 text-blue-600 mr-2" />}
          contentClassName="mt-6 border-t border-gray-200"
          headerContent={
            <div className="flex items-center gap-4">
              <InputForm
                type="text"
                placeholder="Search users..."
                handleOnChange={handleSearchUser}
                iconComponent={
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                }
              />
              <Button
                type="button"
                buttonText="New User"
                handleOnClick={() => setIsEditModalOpen(true)}
              />
            </div>
          }
        >
          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Role
                  </th>
                  {/* <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Status
                  </th> */}
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usersFilter.map((user, index) => {
                  const role =
                    user.role === "admin"
                      ? "Administrator"
                      : user.role === "employee"
                      ? "Employee"
                      : user.role;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-5 w-10 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                      ${
                        !role
                          ? columnsClassName.role.notRegistered
                          : columnsClassName.role[role]
                          ? columnsClassName.role[role]
                          : columnsClassName.role.general
                      }`}
                        >
                          {role || notRegisteredInfo}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                      ${
                        columnsClassName.status[user?.status.toLowerCase()]
                          ? columnsClassName.status[user?.status.toLowerCase()]
                          : columnsClassName.status.inactive
                      }`}
                        >
                          {user.status || notRegisteredInfo}
                        </span>
                      </td> */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            title="Edit"
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            onClick={() => handleEditClick(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            title="Delete"
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Render UserModal */}
          {isEditModalOpen && (
            <UserModal
              onClose={handleCloseModal}
              user={selectedUser}
              onSave={handleSaveUser}
            />
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export default Content;
