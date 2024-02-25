"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";
// import html2pdf from 'html2pdf.js';
import KanbanBoard from "./kanbanBoard";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({
  isCollapsed,
  onResetWidth
}: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    )
  }


  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} /> 
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Файл</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Новая страница <MenubarShortcut></MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Новая страница в папке<MenubarShortcut></MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Отправить</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Ссылку</MenubarItem>
                    <MenubarItem>Соцсети</MenubarItem>
                    <MenubarItem>Почтой</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Экспорировать</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>В формате html</MenubarItem>
                    <MenubarItem>В формате pdf</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Вставить</MenubarTrigger>   
              <MenubarContent>
                <MenubarItem>  Канбан-доску</MenubarItem>
                <MenubarItem>
                  Планировщик<MenubarShortcut></MenubarShortcut>
                </MenubarItem>
                
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Правка</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Назад <MenubarShortcut>Ctrl + Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Вперед <MenubarShortcut>Ctrl + Y</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Поиск</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Поиск в файле</MenubarItem>
                    <MenubarItem>Поиск файла</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Вырезать</MenubarItem>
                <MenubarItem>Скопировать</MenubarItem>
                <MenubarItem>Вставить</MenubarItem>

              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Вид</MenubarTrigger>
              <MenubarContent>
                <MenubarItem inset>Перезагрузить</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Скрыть боковую панель</MenubarItem>
                <MenubarItem inset>Полноэкранный режим</MenubarItem>
                <MenubarSeparator />
                <MenubarCheckboxItem checked>Светлая тема</MenubarCheckboxItem>
                <MenubarCheckboxItem>Темная тема</MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Справка</MenubarTrigger>
              <MenubarContent>
                <MenubarItem inset>О программе</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Репозиторий GitHub</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Сообщество</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} /> 
          </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  )
}