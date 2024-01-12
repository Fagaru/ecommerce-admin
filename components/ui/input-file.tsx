// import React, {ChangeEvent, useState} from 'react';

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface InputFileProps {
//     setSelectedFile: React.Dispatch<React.SetStateAction<File>>;
//     setIsSelected: React.Dispatch<React.SetStateAction<Boolean>>;
// }

// const InputFile: React.FC<InputFileProps> = ({
//   setIsSelected,
//   setSelectedFile,
// }) => {
//   const changeHandlerFile = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
// 		setSelectedFile(event.target.files?.[0]);
// 		setIsSelected(true);
// 	};
  
// 	return(
//    <div className="grid w-full max-w-sm items-center gap-1.5">
// 			<Input type="file" name="file" onChange={changeHandlerFile} />
// 		</div>
// 	);
// }

// export default InputFile;
