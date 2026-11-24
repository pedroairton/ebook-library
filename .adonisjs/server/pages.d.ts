import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.vue'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.vue'))['default']>
    'Authors/Form': ExtractProps<(typeof import('../../inertia/pages/Authors/Form.vue'))['default']>
    'Authors/Index': ExtractProps<(typeof import('../../inertia/pages/Authors/Index.vue'))['default']>
    'Authors/Show': ExtractProps<(typeof import('../../inertia/pages/Authors/Show.vue'))['default']>
    'Books/Form': ExtractProps<(typeof import('../../inertia/pages/Books/Form.vue'))['default']>
    'Books/Index': ExtractProps<(typeof import('../../inertia/pages/Books/Index.vue'))['default']>
    'Books/Show': ExtractProps<(typeof import('../../inertia/pages/Books/Show.vue'))['default']>
    'Categories/Form': ExtractProps<(typeof import('../../inertia/pages/Categories/Form.vue'))['default']>
    'Categories/Index': ExtractProps<(typeof import('../../inertia/pages/Categories/Index.vue'))['default']>
    'Categories/Show': ExtractProps<(typeof import('../../inertia/pages/Categories/Show.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
  }
}
