import { Button, Dialog, DialogPanel } from "@tremor/react";
import React, { cloneElement, useState } from "react";

type IProps = {
  children: React.ReactNode;
  description: string;
  onClick: () => Promise<void>;
}

const DialogConfirmation = ({ children, onClick, description }: IProps) => {
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const childWithOnClick = React.Children.only(children) as React.ReactElement
  return (
    <>
      {cloneElement(childWithOnClick, { onClick: () => setOpen(true) })}
      <Dialog open={isOpen} onClose={(val) => setOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong">
            {description}
          </h3>
          <footer className="mt-8 flex justify-end gap-4">
            <Button disabled={isLoading} variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button loading={isLoading} onClick={handleClick}>
              Aceptar
            </Button>
          </footer>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default DialogConfirmation;