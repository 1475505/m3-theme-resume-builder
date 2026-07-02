import { ref, readonly } from 'vue'
import {
  argbFromHex,
  hexFromArgb,
  Hct,
  SchemeTonalSpot,
} from '@material/material-color-utilities'

export interface ThemeColors {
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string
  surface: string
  onSurface: string
  onSurfaceVariant: string
  surfaceVariant: string
  surfaceContainerLowest: string
  surfaceContainerLow: string
  surfaceContainer: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string
  surfaceDim: string
  surfaceBright: string
  inverseSurface: string
  inverseOnSurface: string
  inversePrimary: string
  outline: string
  outlineVariant: string
  scrim: string
}

/** Map ThemeColors keys to CSS custom property names */
const cssVarMap: Record<keyof ThemeColors, string> = {
  primary: '--md-primary',
  onPrimary: '--md-on-primary',
  primaryContainer: '--md-primary-container',
  onPrimaryContainer: '--md-on-primary-container',
  secondary: '--md-secondary',
  onSecondary: '--md-on-secondary',
  secondaryContainer: '--md-secondary-container',
  onSecondaryContainer: '--md-on-secondary-container',
  tertiary: '--md-tertiary',
  onTertiary: '--md-on-tertiary',
  tertiaryContainer: '--md-tertiary-container',
  onTertiaryContainer: '--md-on-tertiary-container',
  error: '--md-error',
  onError: '--md-on-error',
  errorContainer: '--md-error-container',
  onErrorContainer: '--md-on-error-container',
  surface: '--md-surface',
  onSurface: '--md-on-surface',
  onSurfaceVariant: '--md-on-surface-variant',
  surfaceVariant: '--md-surface-variant',
  surfaceContainerLowest: '--md-surface-container-lowest',
  surfaceContainerLow: '--md-surface-container-low',
  surfaceContainer: '--md-surface-container',
  surfaceContainerHigh: '--md-surface-container-high',
  surfaceContainerHighest: '--md-surface-container-highest',
  surfaceDim: '--md-surface-dim',
  surfaceBright: '--md-surface-bright',
  inverseSurface: '--md-inverse-surface',
  inverseOnSurface: '--md-inverse-on-surface',
  inversePrimary: '--md-inverse-primary',
  outline: '--md-outline',
  outlineVariant: '--md-outline-variant',
  scrim: '--md-scrim',
}

/** Preset seed colors */
export const presetColors = [
  { name: '紫罗兰', hex: '#6750A4', hue: 265, sat: 35 },
  { name: '深海蓝', hex: '#2563EB', hue: 215, sat: 72 },
  { name: '青松绿', hex: '#0D9488', hue: 175, sat: 60 },
  { name: '琥珀橙', hex: '#C2610C', hue: 25, sat: 65 },
  { name: '玫瑰粉', hex: '#DB2777', hue: 330, sat: 70 },
] as const

/**
 * Generate M3-like color scheme from seed hex using HCT.
 * Uses SchemeTonalSpot for proper Material You color generation.
 */
function generateScheme(seedHex: string, isDark: boolean): ThemeColors {
  const sourceColor = argbFromHex(seedHex)
  // SchemeTonalSpot creates a proper M3 scheme from source color
  const scheme = new SchemeTonalSpot(Hct.fromInt(sourceColor), isDark, 0)

  return {
    primary: hexFromArgb(scheme.primary),
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),
    secondary: hexFromArgb(scheme.secondary),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),
    tertiary: hexFromArgb(scheme.tertiary),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),
    error: hexFromArgb(scheme.error),
    onError: hexFromArgb(scheme.onError),
    errorContainer: hexFromArgb(scheme.errorContainer),
    onErrorContainer: hexFromArgb(scheme.onErrorContainer),
    surface: hexFromArgb(scheme.surface),
    onSurface: hexFromArgb(scheme.onSurface),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    surfaceContainerLowest: hexFromArgb(scheme.surfaceContainerLowest),
    surfaceContainerLow: hexFromArgb(scheme.surfaceContainerLow),
    surfaceContainer: hexFromArgb(scheme.surfaceContainer),
    surfaceContainerHigh: hexFromArgb(scheme.surfaceContainerHigh),
    surfaceContainerHighest: hexFromArgb(scheme.surfaceContainerHighest),
    surfaceDim: hexFromArgb(scheme.surfaceDim),
    surfaceBright: hexFromArgb(scheme.surfaceBright),
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    inversePrimary: hexFromArgb(scheme.inversePrimary),
    outline: hexFromArgb(scheme.outline),
    outlineVariant: hexFromArgb(scheme.outlineVariant),
    scrim: hexFromArgb(scheme.scrim),
  }
}

// Global theme state (shared across all components)
const currentSeed = ref(presetColors[0].hex)
const isDark = ref(false)

export function useTheme() {
  function applyTheme(seed: string, dark: boolean) {
    currentSeed.value = seed
    isDark.value = dark

    const colors = generateScheme(seed, dark)
    const root = document.body

    for (const [key, cssVar] of Object.entries(cssVarMap)) {
      const value = colors[key as keyof ThemeColors]
      if (value) root.style.setProperty(cssVar, value)
    }
  }

  function setSeedColor(hex: string) {
    applyTheme(hex, isDark.value)
  }

  function toggleDarkMode() {
    applyTheme(currentSeed.value, !isDark.value)
  }

  // Initialize theme on first call
  if (import.meta.client) {
    applyTheme(currentSeed.value, isDark.value)
  }

  return {
    currentSeed: readonly(currentSeed),
    isDark: readonly(isDark),
    applyTheme,
    setSeedColor,
    toggleDarkMode,
    presetColors,
  }
}
