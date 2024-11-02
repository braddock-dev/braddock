import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface IContextMenuWrapperProps {
  children: React.ReactNode;
}
export default function ContextMenuWrapper(props: IContextMenuWrapperProps) {
  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent forceMount>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
