type Props = { t: { title: string, subtitle: string }, darkMode: boolean }

function Header({t}: Props)
{
    return (
        <div className="p-4 md:p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {t.title}
            </h1>

            <h2 className="text-zinc-500">
                {t.subtitle}
            </h2>
        </div>
    )
}

export default Header