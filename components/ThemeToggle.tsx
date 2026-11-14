import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react'; // Make sure to install @tabler/icons-react if you use these

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  // computedColorScheme ensures correct icon/state resolution even when set to 'auto'
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === 'light' ? (
        <IconSun className="sun-icon" stroke={1.5} />
      ) : (
        <IconMoon className="moon-icon" stroke={1.5} />
      )}
    </ActionIcon>
  );
}
