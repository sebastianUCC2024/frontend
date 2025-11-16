'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'es'

export const translations = {
  en: {
    // Auth
    'auth.welcome': 'Welcome to AgriGo',
    'auth.subtitle': 'Smart Agricultural Platform',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.username': 'Username',
    'auth.role': 'Role',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.loading': 'Loading...',
    'auth.needAccount': 'Need an account? Register',
    'auth.haveAccount': 'Already have an account? Login',
    'auth.testCredentials': 'Test Credentials',
    'auth.placeholder.name': 'Your full name',
    'auth.placeholder.username': 'Username',
    'auth.placeholder.email': 'your@email.com',
    'auth.placeholder.password': '••••••••',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.logout': 'Logout',
    'dashboard.settings': 'Settings',

    // Farmer
    'farmer.title': 'Farmer Dashboard',
    'farmer.crops': 'My Crops',
    'farmer.addCrop': 'Add Crop',
    'farmer.recommendations': 'AI Recommendations',
    'farmer.marketplace': 'My Products',
    'farmer.cropName': 'Crop Name',
    'farmer.area': 'hectares',
    'farmer.plantingDate': 'Planting Date',
    'farmer.status': 'Crop Type',
    'farmer.create': 'Create Crop',
    'farmer.cancel': 'Cancel',
    'farmer.noCrops': 'No crops yet. Create your first crop to get started!',

    // Store
    'store.title': 'Store Dashboard',
    'store.inputs': 'Agricultural Inputs',
    'store.prices': 'Price Management',
    'store.sales': 'Sales Overview',
    'store.addInput': 'Add Input',
    'store.inputName': 'Product Name',
    'store.quantity': 'Quantity',
    'store.price': 'Price',
    'store.save': 'Save',

    // Buyer
    'buyer.title': 'Buyer Dashboard',
    'buyer.marketplace': 'Browse Marketplace',
    'buyer.orders': 'My Orders',
    'buyer.comparator': 'Price Comparator',
    'buyer.search': 'Search products',
    'buyer.filter': 'Filter by',
    'buyer.addToCart': 'Add to Cart',

    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.users': 'Users',
    'admin.analytics': 'Analytics',
    'admin.system': 'System',
    'admin.comingSoon': 'Admin dashboard features coming soon...',

    // Common
    'common.welcome': 'Welcome',
    'common.theme': 'Theme',
    'common.language': 'Language',
    'common.dark': 'Dark',
    'common.light': 'Light',
    'common.system': 'System',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
  },
  es: {
    // Auth
    'auth.welcome': 'Bienvenido a AgriGo',
    'auth.subtitle': 'Plataforma Agrícola Inteligente',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre Completo',
    'auth.username': 'Nombre de Usuario',
    'auth.role': 'Rol',
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.loading': 'Cargando...',
    'auth.needAccount': '¿Necesitas una cuenta? Regístrate',
    'auth.haveAccount': '¿Ya tienes cuenta? Inicia sesión',
    'auth.testCredentials': 'Credenciales de Prueba',
    'auth.placeholder.name': 'Tu nombre completo',
    'auth.placeholder.username': 'Nombre de usuario',
    'auth.placeholder.email': 'tu@email.com',
    'auth.placeholder.password': '••••••••',

    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.logout': 'Cerrar Sesión',
    'dashboard.settings': 'Configuración',

    // Farmer
    'farmer.title': 'Panel del Agricultor',
    'farmer.crops': 'Mis Cultivos',
    'farmer.addCrop': 'Agregar Cultivo',
    'farmer.recommendations': 'Recomendaciones de IA',
    'farmer.marketplace': 'Mis Productos',
    'farmer.cropName': 'Nombre del Cultivo',
    'farmer.area': 'hectáreas',
    'farmer.plantingDate': 'Fecha de Siembra',
    'farmer.status': 'Tipo de Cultivo',
    'farmer.create': 'Crear Cultivo',
    'farmer.cancel': 'Cancelar',
    'farmer.noCrops': '¡No hay cultivos aún. Crea tu primer cultivo para comenzar!',

    // Store
    'store.title': 'Panel de la Tienda',
    'store.inputs': 'Insumos Agrícolas',
    'store.prices': 'Gestión de Precios',
    'store.sales': 'Resumen de Ventas',
    'store.addInput': 'Agregar Insumo',
    'store.inputName': 'Nombre del Producto',
    'store.quantity': 'Cantidad',
    'store.price': 'Precio',
    'store.save': 'Guardar',

    // Buyer
    'buyer.title': 'Panel del Comprador',
    'buyer.marketplace': 'Explorar Marketplace',
    'buyer.orders': 'Mis Pedidos',
    'buyer.comparator': 'Comparador de Precios',
    'buyer.search': 'Buscar productos',
    'buyer.filter': 'Filtrar por',
    'buyer.addToCart': 'Añadir al Carrito',

    // Admin
    'admin.title': 'Panel de Administración',
    'admin.users': 'Usuarios',
    'admin.analytics': 'Análisis',
    'admin.system': 'Sistema',
    'admin.comingSoon': 'Las características del panel de administración pronto estará disponibles...',

    // Common
    'common.welcome': 'Bienvenido',
    'common.theme': 'Tema',
    'common.language': 'Idioma',
    'common.dark': 'Oscuro',
    'common.light': 'Claro',
    'common.system': 'Sistema',
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.success': 'Éxito',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null
    if (stored) {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  // Always render children to avoid hydration issues
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
