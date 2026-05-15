type Props = {
    t: {
        title: string
        subtitle: string
    }
}

function Header({ t }: Props) {
    return (
        <div className="p-6 border-b border-zinc-800">
            <h1 className="text-5xl font-bold mb-2">
                {t.title}
            </h1>

            <h2 className="text-zinc-500">
                {t.subtitle}
            </h2>
        </div>
    )
}

export default Header