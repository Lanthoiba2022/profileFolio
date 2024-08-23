import { ChevronDown, EditIcon, Share2, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumePDF from './ResumePDF';
import { useFormContext } from 'react-hook-form';

interface HeaderProps {
  resumeName: string;
  setResumeName: (name: string) => void;
  resumeData: any;
}

export default function ResumeHeader({ setResumeName, resumeName, resumeData }: HeaderProps) {
  const { getValues } = useFormContext();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(resumeName);

  useEffect(() => {
    setInputValue(resumeName);
  }, [resumeName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckClick = () => {
    setResumeName(inputValue);
    setIsEditing(false);
  };

  const handleDownload = async () => {
    const resumeData = getValues();
    const doc = <ResumePDF resumeData={resumeData} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, `${resumeName}.pdf`);
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-40"
            />
            <Check
              size={20}
              cursor={'pointer'}
              className="text-green-500"
              onClick={handleCheckClick}
            />
          </>
        ) : (
          <>
            <h1 className="font-semibold text-base">{resumeName}</h1>
            <EditIcon size={20} cursor={'pointer'} onClick={handleEditClick} />
          </>
        )}
      </div>
      <div className="flex gap-6 items-center">
        <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
          Change Template
        </span>
        <Button variant={'outline'} className="py-0 px-3">
          <Share2 size={15} />
        </Button>
        <Button onClick={handleDownload} className="bg-green-500 text-white hover:bg-green-700 py-2 px-4 rounded flex items-center">
          Download
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}
