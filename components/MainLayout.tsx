import { AppShell, Box, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ThemeToggle } from './ThemeToggle';

export function MainLayout(params: { title: string; body: React.ReactNode; footer?: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: params.footer == null ? 0 : 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <div>{params.title}</div>
          </Group>
          <ThemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navigation Links</AppShell.Navbar>

      <AppShell.Main>
        {params.body}
      </AppShell.Main>

      {params.footer && (
        <AppShell.Footer p="sm">
          {params.footer}
        </AppShell.Footer>
      )}
    </AppShell>
  );
}

