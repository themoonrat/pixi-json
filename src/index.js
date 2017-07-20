if (PIXI.Container)
{
    PIXI.Container.fromJSON = function fromJSON(json, parent)
{
        const container = new PIXI.Container();

        if (json.x)
{
            container.x = json.x;
        }
        if (json.y)
{
            container.y = json.y;
        }

        if (parent && parent.addChild)
{
            parent.addChild(container);
        }

        return container;
    };

    PIXI.Container.prototype.toJSON = function toJSON()
{
        return {
            x: this.x,
            y: this.y,
        };
    };

    PIXI.Container.prototype.updateViaJSON = function updateViaJSON(json)
{
        if (json.x)
{
            this.x = json.x;
        }
        if (json.y)
{
            this.y = json.y;
        }
    };
}
