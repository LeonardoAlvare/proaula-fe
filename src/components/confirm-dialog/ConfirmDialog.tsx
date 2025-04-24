import React, { createContext, useState, useContext, ReactNode } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

interface ConfirmDialogContextType {
  showConfirmDialog: (options: ConfirmDialogOptions) => void;
}

interface ConfirmDialogOptions {
  message: string;
  header: string;
  icon: string;
  accept: () => void;
  reject?: () => void;
}

const ConfirmDialogContext = createContext<
  ConfirmDialogContextType | undefined
>(undefined);

export const ConfirmDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [dialogOptions, setDialogOptions] =
    useState<ConfirmDialogOptions | null>(null);

  const showConfirmDialog = (options: ConfirmDialogOptions) => {
    setDialogOptions(options);
    setVisible(true);
  };

  const onHide = () => setVisible(false);

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
      {children}
      <ConfirmDialog
        visible={visible}
        onHide={onHide}
        message={dialogOptions?.message || ""}
        header={dialogOptions?.header || ""}
        icon={dialogOptions?.icon || ""}
        accept={() => {
          dialogOptions?.accept();
          onHide();
        }}
        reject={() => {
          dialogOptions?.reject?.();
          onHide();
        }}
      />
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = (): ConfirmDialogContextType => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within a ConfirmDialogProvider"
    );
  }
  return context;
};
