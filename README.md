# CamoNotifications 
![camo-notifications](https://user-images.githubusercontent.com/29387855/187033493-8da6f70f-763c-4e0e-9877-7bff5d271ee7.png)

Notifications library that disguises itself in your application 🥷😶‍🌫️

[Check out the storybook](https://alessandroroic.github.io/CamoNotifications) with some examples

## Features

- Adaptable - generates the perfect background color based on the selected harmony
- Customizable - use the generated colors or pass your own
- Easy to use
- Lightweight

## Install

```
npm install camo-notifications
```

## Usage

```
function Example() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button type='button' onClick={() => {setIsOpen(!isOpen)}}>
              toggle
            </button>
            <Notification
              id='example'
              notificationType={NotificationType.COOKIE}
              isOpen={isOpen}
              onClose={toggle}
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit' />
          </div>
      )
}
```
