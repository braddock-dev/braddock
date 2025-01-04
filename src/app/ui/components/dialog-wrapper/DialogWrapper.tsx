import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IDialogWrapperProps {
  isOpen: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onOpenChange: (isOpen: boolean) => void;
  contentClassName?: string;
}
export default function DialogWrapper(props: IDialogWrapperProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange} modal>
      <DialogContent className={`${props.contentClassName}`}>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
