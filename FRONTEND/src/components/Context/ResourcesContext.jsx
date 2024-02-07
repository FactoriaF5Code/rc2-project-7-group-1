import { createContext, useState, useContext } from "react";

const ResourcesContext = createContext();

export const ResourcesContextProvider = ({ children }) => {
  const [needsReload, setNeedsReload] = useState(true);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setShowMessage(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <ResourcesContext.Provider
      value={{
        needsReload,
        setNeedsReload,
        open,
        setOpen,
        showMessage,
        setShowMessage,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResourcesContext = () => useContext(ResourcesContext);
