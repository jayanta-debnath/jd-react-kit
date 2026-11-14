import { AppShell, Burger, Group } from '@mantine/core'; // 1. Import Group
import { useDisclosure } from '@mantine/hooks';

export function MainLayout(params: { title: string; body: string }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <div>{params.title}</div>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navigation Links</AppShell.Navbar>

      <AppShell.Main>{params.body}</AppShell.Main>
    </AppShell>
  );
}
