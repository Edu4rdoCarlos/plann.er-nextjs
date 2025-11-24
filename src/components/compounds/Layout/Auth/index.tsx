interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12">
        <div className="text-center space-y-6">
          <img src="/logo/Logo.svg" alt="plann.er" className="w-48 h-auto mx-auto" />
          <p className="text-2xl font-light text-zinc-600 dark:text-zinc-400">
            Planeje. Conecte. Explore.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center">
            <img src="/logo/Logo.svg" alt="plann.er" className="w-32 h-auto mx-auto mb-4" />
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 