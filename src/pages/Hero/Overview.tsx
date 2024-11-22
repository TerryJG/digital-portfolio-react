import { IconText } from "@/components/ui/IconText";

export function Overview() {
  return (
    <div className=" flex flex-col gap-3 [&_p]:leading-5 ">
      <p className="flex flex-wrap items-center justify-center gap-1">
        Experienced in using Adobe Creative Suite including:
        <IconText
          text="Adobe Premiere Pro,"
          icon="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png"
        />
        <IconText
          text="Adobe After Effects,"
          icon="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/512px-Adobe_After_Effects_CC_icon.svg.png"
        />
        <span>and</span>
        <IconText
          text="Adobe Photoshop"
          icon="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png"
        />
      </p>

      <p className="flex flex-wrap items-center justify-center gap-1">
        Proficient hands-on experience with
            <IconText
              text="Windows"
              textClassName="pe-[2px]"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/88px-Windows_logo_-_2012.svg.png?20220903072431"
            />
            <p>and</p>
            <IconText text="Linux, " icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/506px-Tux.svg.png?20220320193426" />
            <p>with technical knowledge of web technologies such as</p>
            <IconText text="HTML," icon="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png" />
            <IconText text="CSS," icon="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/512px-CSS3_logo.svg.png?20210705212817" />
            <IconText
              text="JavaScript,"
              textClassName="ps-[2px]"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902"
            />
            <IconText text="Python," icon="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/115px-Python-logo-notext.svg.png" />
            <IconText text="React," textClassName="pe-[2px]" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" />
            <p>and</p>
            <IconText text="Svelte" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/498px-Svelte_Logo.svg.png" />
    </p>
    </div>
  );
}
