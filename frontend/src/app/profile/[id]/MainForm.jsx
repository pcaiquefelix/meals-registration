"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { User, Settings, Lock } from "lucide-react";
import InputForm from "@/components/form/InputForm";
import InputPasswordForm from "@/components/form/InputPasswordForm";
import Button from "@/components/common/Button";
import ContentWrapper from "@/components/layout/ContentWrapper";
import CustomLoader from "@/components/common/CustomLoader";
import CredentialLoader from "@/components/common/CredentialLoader";
import bcrypt from "bcryptjs";
import logoutClient from "@/services/logoutClient";
import { NextApiHandler } from "@/services/NextApiHandler";

const MainForm = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    ...user,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [currentPasswordValidator, setCurrentPasswordValidator] = useState({
    status: "",
    message: "",
    notSelected: true,
  });
  const [newPasswordCompareValidator, setNewPasswordCompareValidator] =
    useState({
      status: "",
      message: "",
      notSelected: true,
    });
  const validationControllerRef = useRef(null);
  const currentPasswordErrorMessage = "Incorrect current password";
  const newPasswordErrorMessage = "Passwords do not match";

  const validateCurrentPassword = useCallback(
    async (value, controller) => {
      try {
        if (value) {
          const isCurrentPasswordValid = await bcrypt.compare(
            value,
            user.password
          );

          if (!controller.signal.aborted) {
            setCurrentPasswordValidator({
              status: isCurrentPasswordValid ? "success" : "error",
              message: isCurrentPasswordValid
                ? " "
                : currentPasswordErrorMessage,
            });
          }
        } else {
          setCurrentPasswordValidator({
            status: "error",
            message: currentPasswordErrorMessage,
          });
        }
      } catch (error) {
        setCurrentPasswordValidator({
          status: "error",
          message: currentPasswordErrorMessage,
        });
      }
    },
    [user.password]
  );

  const debouncedValidateCurrentPassword = useCallback(
    (value, controller) => {
      const timeoutId = setTimeout(() => {
        validateCurrentPassword(value, controller);
      }, 500);
      return () => clearTimeout(timeoutId);
    },
    [validateCurrentPassword]
  );

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const currentPasswordOnChange = async (e) => {
    const newValue = e.target.value;

    if (validationControllerRef.current) {
      validationControllerRef.current.abort();
    }

    const controller = new AbortController();
    validationControllerRef.current = controller;

    setProfile({
      ...profile,
      [e.target.name]: newValue,
    });

    setCurrentPasswordValidator({ status: "idle", message: "Validating..." });

    const cleanupTimeout = debouncedValidateCurrentPassword(
      newValue,
      controller
    );
    return () => cleanupTimeout();
  };

  const newPasswordOnChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });

    const isNewPasswordValid = value
      ? name === "confirmNewPassword"
        ? value === profile.newPassword
        : profile.confirmNewPassword === value
      : false;
    const newPasswordCompareValidatorUpdate = {
      status: isNewPasswordValid ? "success" : "error",
      message: isNewPasswordValid ? " " : newPasswordErrorMessage,
    };
    setNewPasswordCompareValidator(newPasswordCompareValidatorUpdate);
  };

  const cancelOnClick = () => {
    const confirmation = confirm("Do you want to discard all changes?");
    if (confirmation) {
      window.history.back();
    }
  };

  const handleFocusOutPasswordField = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (
        e.currentTarget.id === "current-password" &&
        !profile.currentPassword
      ) {
        setCurrentPasswordValidator({
          status: "error",
          message: currentPasswordErrorMessage,
        });
      } else if (
        e.currentTarget.id === "new-password" &&
        !profile.newPassword &&
        !profile.confirmNewPassword
      ) {
        setNewPasswordCompareValidator({
          status: "error",
          message: newPasswordErrorMessage,
        });
      }
    }
  };

  const saveOnClick = async () => {
    if (currentPasswordValidator.status !== "success") {
      return alert("Incorrect current password");
    }

    if (newPasswordCompareValidator.status !== "success") {
      return alert("New password does not match the confirmation");
    }

    if (!profile.newPassword) {
      return alert("Please enter a new password");
    }

    try {
      const response = await NextApiHandler.put(
        `/api/users/update-users/${user.id}`,
        { password: profile.newPassword }
      );
      if (response instanceof Error) {
        return alert(
          "The update encountered the following error: " + response.message
        );
      }
      alert(
        "Password updated successfully! \nYou will need to log in with your new password."
      );

      return await logoutClient();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Captured error:");
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
      } else {
        console.error("Unknown error:", error);
      }
      return alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ContentWrapper>
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <Settings className="mr-3 text-blue-600" />
        Profile Settings
      </h2>

      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="flex items-center font-medium text-gray-600 mb-2">
                <User className="mr-2 text-blue-600" /> Personal Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <InputForm
                  labelText="Full Name"
                  type="text"
                  value={profile.name}
                  disabled
                />
                <InputForm
                  labelText="Email"
                  type="email"
                  value={profile.email}
                  disabled
                />
              </div>
            </div>

            <div className="border-b pb-4">
              <h4 className="flex items-center font-medium text-gray-600 mb-2">
                <Lock className="mr-2 text-blue-600" /> Security
              </h4>
              <div id="current-password" onBlur={handleFocusOutPasswordField}>
                <InputPasswordForm
                  labelText="Current Password"
                  name="currentPassword"
                  value={profile.currentPassword}
                  handleOnChange={currentPasswordOnChange}
                />
                {currentPasswordValidator.status && (
                  <CredentialLoader
                    status={currentPasswordValidator.status}
                    message={currentPasswordValidator.message}
                  />
                )}
              </div>
              <div
                id="new-password"
                className="grid grid-cols-2 gap-4 pt-4"
                onBlur={handleFocusOutPasswordField}
              >
                <InputPasswordForm
                  labelText="New Password"
                  name="newPassword"
                  value={profile.newPassword}
                  handleOnChange={newPasswordOnChange}
                />
                <InputPasswordForm
                  labelText="Confirm New Password"
                  name="confirmNewPassword"
                  value={profile.confirmNewPassword}
                  handleOnChange={newPasswordOnChange}
                />
              </div>
              {newPasswordCompareValidator.status && (
                <CredentialLoader
                  status={newPasswordCompareValidator.status}
                  message={newPasswordCompareValidator.message}
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              buttonText="Cancel"
              buttonClassName="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              handleOnClick={cancelOnClick}
            />
            <Button buttonText="Save Changes" handleOnClick={saveOnClick} />
          </div>
        </>
      )}
    </ContentWrapper>
  );
};

export default MainForm;
