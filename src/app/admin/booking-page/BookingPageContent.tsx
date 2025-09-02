"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/app/ui/components/button/Button";
import { ButtonColors, ButtonSizes } from "@/app/ui/components/button/Button";
import Input from "@/app/ui/components/input/Input";
import LogoUploader from "@/app/ui/components/logo-uploader/LogoUploader";
import CoverImageUploader from "@/app/ui/components/cover-image-uploader/CoverImageUploader";
import ColorPicker from "@/app/ui/components/color-picker/ColorPicker";
import BookingPagePreview from "./BookingPagePreview";

interface MockedData {
  pageTitle: string;
  pageUrl: string;
  isOnline: boolean;
  logo: string | null;
  coverImage: string;
  backgroundImage: string;
  backgroundColor: string;
  services: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

const mockedData: MockedData = {
  pageTitle: "Test Business",
  pageUrl: "test-business-1",
  isOnline: true,
  logo: null,
  coverImage: "/hero-image.jpg",
  backgroundImage: "",
  backgroundColor: "#ffffff",
  services: [
    { id: "1", name: "Barba completa", price: 15 },
    { id: "2", name: "Corte", price: 20 },
    { id: "3", name: "Barba simples", price: 10 },
    { id: "4", name: "Cortes Com Desenhos", price: 25 },
  ],
};

export default function BookingPageContent() {
  const [data, setData] = useState<MockedData>(mockedData);
  const [isOnline, setIsOnline] = useState(data.isOnline);

  const { register, setValue, trigger, getValues } = useForm({
    defaultValues: {
      backgroundColor: data.backgroundColor,
    },
  });

  const handleSave = () => {
    console.log("Saving booking page configuration:", data);
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    console.log("Canceling changes");
    // TODO: Implement cancel functionality
  };

  const handleLogoUpload = () => {
    console.log("Uploading logo");
    // TODO: Implement logo upload
  };

  const handleLogoRemove = () => {
    setData((prev) => ({ ...prev, logo: null }));
  };

  const handleCoverImageUpload = () => {
    console.log("Uploading cover image");
    // TODO: Implement cover image upload
  };

  const handleCoverImageRemove = () => {
    setData((prev) => ({ ...prev, coverImage: "" }));
  };

  const handleBackgroundColorChange = (color: string) => {
    setData((prev) => ({ ...prev, backgroundColor: color }));
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center md:px-6 px-4 py-3 bg-white border-b border-gray-200 h-15">
        <div className="flex items-center gap-3 text-base font-medium text-black">
          <h1 className="text-2xl font-bold text-amber-800">Página de Marcações</h1>
        </div>

        <div className="flex gap-3">
          <Button color={ButtonColors.LIGHT_BROWN} size={ButtonSizes.DEFAULT}>
            Partilhar
          </Button>

          <Button color={ButtonColors.BROWN} size={ButtonSizes.DEFAULT} onClick={handleSave}>
            Gravar
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden lg:flex-row flex-col">
        {/* Left Panel - Configuration */}
        <div className="lg:flex-2 lg:border-r lg:border-b-0 border-b border-gray-200 lg:p-8 md:p-6 p-4 bg-white overflow-y-auto">
          <div>
            {/* Page Title */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-black mb-3">Título da Página</label>
              <Input
                value={data.pageTitle}
                onChange={(e) => setData((prev) => ({ ...prev, pageTitle: e.target.value }))}
                hasValue={true}
                classNameContainer="w-full"
                themeMode="light"
              />
            </div>

            {/* Page URL */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-black mb-3">Link da Página de Marcações</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">https://</span>
                <Input
                  value={data.pageUrl}
                  onChange={(e) => setData((prev) => ({ ...prev, pageUrl: e.target.value }))}
                  hasValue={true}
                  classNameContainer="flex-1"
                  themeMode="light"
                />
                <span className="text-sm text-gray-500 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">.omnischedule.com</span>
              </div>
            </div>

            {/* Branding Customization */}
            <div className="flex gap-6 mb-6">
              {/* Cover Image Upload */}
              <div className="">
                <label className="block text-base font-semibold text-black mb-2">Imagem de capa</label>
                <CoverImageUploader
                  onUploadComplete={(fileUrl) => {
                    setData((prev) => ({ ...prev, coverImage: fileUrl }));
                  }}
                  defaultValue={data.coverImage ?? undefined}
                />
              </div>

              <div className="">
                <label className="block text-base font-semibold text-black mb-2">Imagem de fundo</label>
                <CoverImageUploader
                  onUploadComplete={(fileUrl) => {
                    setData((prev) => ({ ...prev, backgroundImage: fileUrl }));
                  }}
                  defaultValue={data.backgroundImage ?? undefined}
                />
              </div>
            </div>

            {/* Background Color */}
            <div className="mb-8">
              <ColorPicker
                register={register}
                setValue={(name, value) => {
                  setValue(name as "backgroundColor", value);
                  handleBackgroundColorChange(value);
                }}
                trigger={trigger}
                getValues={getValues}
                name="backgroundColor"
                label="Cor de fundo"
                defaultValue={data.backgroundColor}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <BookingPagePreview
          pageTitle={data.pageTitle}
          coverImage={data.coverImage}
          backgroundImage={data.backgroundImage}
          backgroundColor={data.backgroundColor}
          services={data.services}
        />
      </div>
    </div>
  );
}
