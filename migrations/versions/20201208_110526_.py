"""empty message

Revision ID: 35c185bcf61e
Revises: ba6db4db94aa
Create Date: 2020-12-08 11:05:26.150034

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35c185bcf61e'
down_revision = 'ba6db4db94aa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('exercises', sa.Column('order', sa.Integer(), nullable=False))
    op.add_column('sessions', sa.Column('order', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('sessions', 'order')
    op.drop_column('exercises', 'order')
    # ### end Alembic commands ###