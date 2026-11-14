import { AppShell, Burger, Group } from '@mantine/core'; // 1. Import Group
import { useDisclosure } from '@mantine/hooks';

export function MainLayout(params: { title: string, body: string }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <div>{params.title}</div>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navigation Links</AppShell.Navbar>

      <AppShell.Main>{params.body}</AppShell.Main>
    </AppShell>
  );
}
