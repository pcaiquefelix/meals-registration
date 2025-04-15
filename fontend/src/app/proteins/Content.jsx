"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Search, Drumstick } from "lucide-react";
import ProteinModal from "@/components/proteins/ProteinModal";
import Button from "@/components/common/Button";
import ContentWrapper from "@/components/layout/ContentWrapper";
import InputForm from "@/components/form/InputForm";
import CustomLoader from "@/components/common/CustomLoader";
import { NextApiHandler } from "@/services/NextApiHandler";

const Content = ({ proteins, updateProteins }) => {
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [proteinsFilter, setProteinsFilter] = useState(proteins);

  useEffect(() => {
    setLoading(false);
  }, [proteins, proteinsFilter]);

  const handleSearchProtein = (e) => {
    const searchFilterUpdate = proteins.filter((protein) =>
      protein.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setProteinsFilter(searchFilterUpdate);
  };

  const handleEditClick = (protein) => {
    setSelectedProtein(protein);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProtein(null);
  };

  const deleteProtein = async (proteinId) => {
    const confirmation = confirm("Do you want to delete the selected protein?");

    if (confirmation) {
      try {
        const response = await NextApiHandler.delete(
          `/api/proteins/delete-proteins/${proteinId}`
        );

        if (response instanceof Error) {
          return alert(
            "The deletion encountered the following error: " + response.message
          );
        }
        proteins.splice(
          proteins.findIndex((protein) => protein.id === proteinId),
          1
        );
        setProteinsFilter([...proteins]);

        alert("Protein successfully deleted!");
        handleCloseModal();
      } catch (error) {
        handleError(error);
      }
    }
  };

  const createProtein = async (protein) => {
    try {
      const response = await NextApiHandler.post(
        "/api/proteins/create-proteins",
        protein
      );

      if (response instanceof Error) {
        return alert(
          "The creation encountered the following error: " + response.message
        );
      }
      const proteinsUpdateResponse = await updateProteins();
      if (proteinsUpdateResponse instanceof Error) {
        return alert(
          "The creation encountered the following error: " + response.message
        );
      }
      const proteinsUpdate = proteinsUpdateResponse.find(
        (listProtein) => listProtein.name === protein.name
      );
      proteins.push(proteinsUpdate);

      setLoading(true);
      setProteinsFilter([...proteins]);

      alert("Protein successfully created!");
      handleCloseModal();
    } catch (error) {
      handleError(error);
    }
  };

  const updateProtein = async (protein) => {
    try {
      const response = await NextApiHandler.put(
        `/api/proteins/update-proteins/${protein.id}`,
        protein
      );

      if (response instanceof Error) {
        return alert(
          "The update encountered the following error: " + response.message
        );
      }
      const proteinsUpdate = proteins.map((proteinItem) => {
        if (proteinItem.id === protein.id) {
          return Object.assign(proteinItem, protein);
        }
        return proteinItem;
      });
      setProteinsFilter(proteinsUpdate);

      alert("Protein successfully updated!");
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

  const handleSaveProtein = (protein) => {
    if (protein.id) {
      updateProtein(protein);
    } else {
      createProtein(protein);
    }
  };

  return (
    <>
      {loading ? (
        <ContentWrapper
          title="System Proteins"
          titleIcon={<Drumstick className="w-10 h-10 text-blue-600 mr-2" />}
        >
          <CustomLoader />
        </ContentWrapper>
      ) : (
        <ContentWrapper
          title="System Proteins"
          titleIcon={<Drumstick className="w-10 h-10 text-blue-600 mr-2" />}
          contentClassName="mt-6 border-t border-gray-200"
          headerContent={
            <div className="flex items-center gap-4">
              <InputForm
                type="text"
                placeholder="Search proteins..."
                handleOnChange={handleSearchProtein}
                iconComponent={
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                }
              />
              <Button
                type="button"
                buttonText="New Protein"
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
                    Protein
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Monthly Incidence
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {proteinsFilter.map((protein, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {protein.name}
                      </div>
                    </td>
                    <td className="flex justify-center px-6 py-4">
                      <div className="text-gray-900">
                        {protein.monthlyIncidence}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          title="Edit"
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          onClick={() => handleEditClick(protein)}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          title="Delete"
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          onClick={() => deleteProtein(protein.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Render ProteinModal */}
          {isEditModalOpen && (
            <ProteinModal
              onClose={handleCloseModal}
              protein={selectedProtein}
              onSave={handleSaveProtein}
            />
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export default Content;
