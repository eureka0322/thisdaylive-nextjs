import {InlineShareButtons} from 'sharethis-reactjs';
export default function ShareThisInlineButtons() {
    return (
        <InlineShareButtons
          config={{
            alignment: 'left',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 11,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'facebook',
              'twitter',
              'pinterest',
              'email',
              'sharethis',
              // 'telegram',
              'whatsapp',
              'messenger'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 3,            // the corner radius on each button (INTEGER)
            show_total: false,
            size: 32,             // the size of each button (INTEGER)
          }}
        />
    )
}