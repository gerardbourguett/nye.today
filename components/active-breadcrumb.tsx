'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Esta estructura debe coincidir con la de app-sidebar.tsx
const routes = [
  {
    title: 'Countdown',
    url: '/',
    items: [
      {
        title: 'Time Progress',
        url: '/',
      },
      {
        title: 'Countdown',
        url: '/countdown',
      },
    ],
  },
  {
    title: 'Road to 2026',
    url: '#',
    items: [
      {
        title: 'World Clock',
        url: '/world-clock',
      },
      {
        title: 'Road to 2026',
        url: '/roadto2026',
      },
    ],
  },
];

export function ActiveBreadcrumb() {
  const pathname = usePathname();

  // Encontrar el grupo y el item activo según la ruta actual
  let activeGroup = routes[0];
  let activeItem = routes[0].items[0];

  for (const group of routes) {
    for (const item of group.items) {
      if (item.url === pathname) {
        activeGroup = group;
        activeItem = item;
        break;
      }
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            href={activeGroup.url !== '#' ? activeGroup.url : undefined}
          >
            {activeGroup.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{activeItem.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
